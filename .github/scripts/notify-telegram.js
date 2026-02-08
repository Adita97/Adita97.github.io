/**
 * GitHub Actions script: Send Telegram RSVP notifications
 * 
 * This script:
 * 1. Queries Supabase for new RSVPs (confirmed but not notified)
 * 2. Sends Telegram messages for each
 * 3. Updates the telegram_notified flag to prevent duplicates
 */

const axios = require('axios');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_IDS
  ? process.env.TELEGRAM_CHAT_IDS.split(',').map(id => id.trim())
  : [];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

if (!TELEGRAM_BOT_TOKEN || TELEGRAM_CHAT_IDS.length === 0) {
  console.error('❌ Missing Telegram credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

async function sendTelegramMessage(chatId, message) {
  try {
    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML'
    });
    return { success: true, messageId: response.data.result.message_id };
  } catch (error) {
    console.error(`Failed to send to chat ${chatId}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function notifyRsvps() {
  try {
    // Query for confirmed RSVPs that haven't been notified yet
    const { data: newRsvps, error: queryError } = await supabase
      .from('guests')
      .select('*')
      .eq('confirmed', true)
      .eq('telegram_notified', false);

    if (queryError) {
      console.error('Error querying Supabase:', queryError.message);
      process.exit(1);
    }

    if (!newRsvps || newRsvps.length === 0) {
      console.log('✅ No new RSVPs to notify');
      process.exit(0);
    }

    console.log(`📩 Found ${newRsvps.length} new RSVP(s) to notify`);

    // Send notification for each RSVP
    for (const guest of newRsvps) {
      const guestName = `${guest.first_name} ${guest.last_name}`;
      const plusOnes = guest.bringing_guests ? (Array.isArray(guest.guest_names) ? guest.guest_names.length : 1) : 0;

      let message = `🎉 <b>New RSVP Received!</b>\n\n`;
      message += `👤 <b>Guest:</b> ${guestName}\n`;
      message += `📋 <b>Status:</b> ✅ ATTENDING\n`;
      message += `👥 <b>Plus-ones:</b> ${plusOnes}\n`;
      
      if (guest.song_request) {
        message += `🎵 <b>Song Request:</b> ${guest.song_request}\n`;
      }
      
      message += `\n⏰ <b>Time:</b> ${new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      })}`;

      console.log(`📲 Notifying: ${guestName}`);

      // Send to all receivers
      let anySuccess = false;
      for (const chatId of TELEGRAM_CHAT_IDS) {
        const result = await sendTelegramMessage(chatId, message);
        if (result.success) {
          console.log(`   ✅ Sent to chat ${chatId}`);
          anySuccess = true;
        } else {
          console.warn(`   ❌ Failed to send to chat ${chatId}`);
        }
      }

      // Only mark as notified if at least one message was sent
      if (anySuccess) {
        const { error: updateError } = await supabase
          .from('guests')
          .update({ telegram_notified: true })
          .eq('id', guest.id);

        if (updateError) {
          console.error(`Failed to update guest ${guest.id}:`, updateError.message);
        }
      }
    }

    console.log('✅ Notification cycle complete');
    process.exit(0);

  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    process.exit(1);
  }
}

notifyRsvps();
