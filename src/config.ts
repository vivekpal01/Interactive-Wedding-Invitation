// ====== EDIT ME ======
// Music: put your MP3 at public/audio/wedding-song.mp3 (already included). Replace the file to change the song.
export const MUSIC_SRC = "/audio/wedding-song.mp3";
export const YOUTUBE_URL = "https://www.youtube.com/watch?v=DhZ3a46i3so"; // optional "listen on YouTube" link

// Venue: DIRECTIONS_URL is the verified Google Maps share link.
// For an embedded map: Google Maps -> your venue -> Share -> "Embed a map" -> copy ONLY the src="..." URL and paste it into MAP_EMBED_SRC.

export const VENUE_NAME = "Baig Farms & Resort";
export const VENUE_PLACE = "Nagpur, Maharashtra, India";

export const DIRECTIONS_URL =
  "https://maps.app.goo.gl/iJWPH7k3C4M2aMqY8";

export const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2862.1093379450253!2d79.0292242738629!3d21.220373981172795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4c3dfab12c2bb%3A0xa50f7970abe77175!2sBaig%20Farms%20%26%20Resort!5e1!3m2!1sen!2sin!4v1793854809940!5m2!1sen!2sin";


export const S = (n: string) => `/stickers/${n}.png`;

export const EVENTS = [
  { key: "haldi", name: "Haldi Ceremony", day: "24 December 2026", time: "11:30 AM", sticker: "y-haldi", tag: "Sun-Kissed Vineyard", dress: "Soft Pink tones" },
  { key: "sangeet", name: "Sangeet Celebration", day: "24 December 2026", time: "7:00 PM", sticker: "y-sangeet", tag: "Bollywood After Dark", dress: "Bollywood Glam" },
  { key: "wedding", name: "Wedding Ceremony", day: "25 December 2026", time: "4:30 PM", sticker: "y-wedding", tag: "Vows at Golden Hour", dress: "Traditional & festive" },
  { key: "reception", name: "Wedding Reception", day: "26 December 2026", time: "7:00 PM", sticker: "y-reception", tag: "The Finale Toast", dress: "Elegant formal" },
];

export const FAMILIES = {
  groom: { title: "Groom's Family", person: "Nishant Thool", father: "Bhimrao Thool", mother: "Shobha Thool" },
  bride: { title: "Bride's Family", person: "Purwa Manhar", father: "Kishor Manhar", mother: "Dipali Manhar" },
};
