Optional audio (royalty-free only - no Marvel / film audio).

  ambient.m4a   looping background track   AAC, 96-128 kbps, "fast start"
  impact.m4a    short hit for the Register button (optional)

Make an .m4a "fast start" (metadata at the front, so it starts streaming at once):
  ffmpeg -i ambient.wav -c:a aac -b:a 128k -movflags +faststart ambient.m4a
  ffmpeg -i impact.wav  -c:a aac -b:a 128k -movflags +faststart impact.m4a

Then switch it on in src/data/event.js:  audio.enabled = true
The mute button appears in the header only when audio is enabled and ambient.m4a exists.
