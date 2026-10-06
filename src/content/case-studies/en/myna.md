---
title: "Myna: a podcast studio that speaks in your voice"
description: How Myna turns a written script into a mastered podcast episode, with a neural voice that runs entirely in the browser.
---
## The problem

Turning a script into a finished episode usually means recording it yourself, or sending the text, and sometimes recordings of your voice, to a cloud service.

Myna sets itself two constraints. Nothing leaves the device: no upload, no account, and it works offline. And because a voice is a powerful thing to copy, no voice can be used without its speaker's recorded consent.

## What I built

- **Myna**, an installable web app where you write the script, render it, master the audio and export an MP3 with chapters, plus what you need to publish the feed.
- **Myna Atelier**, a desktop app for Mac, Windows and Linux that trains your own voice from 30 to 60 minutes of recordings, on your machine.
- **voicelab**, the command-line tool Atelier drives: it checks the dataset, fine-tunes the voice and exports it as a single `.voice` file.
- **Shared schemas** for every file these parts exchange.

## How it works

**Speech in a Web Worker.** Piper VITS models run through ONNX Runtime Web, with espeak-ng compiled to WebAssembly producing the phonemes. On an M-series Mac, rendering is about 15 to 20 times faster than real time. Details are in the [TTS architecture](https://podcast.iscor.me/docs/architecture/tts) page.

**Broadcast audio in plain TypeScript.** Loudness is measured to EBU R128, then a compressor, a lookahead limiter and ducking of the music under the voice produce the final mix, encoded as MP3 with ID3 chapters. See the [audio pipeline](https://podcast.iscor.me/docs/architecture/audio-pipeline).

**Consent checked from the audio.** Every voice carries a recording of its speaker reading a consent sentence with a random code. Whisper and a speaker fingerprint check it before training, and the app refuses a voice that does not have it. See [consent and provenance](https://podcast.iscor.me/docs/architecture/consent).

**Local-first storage.** Episodes live in IndexedDB and the Origin Private File System, and a service worker keeps the speech engine available offline.

**One contract, four readers.** The file formats are JSON Schemas, checked against the same fixtures by the web app, the Python trainer, the Mac app and the Windows and Linux app.

## What I learned

- Running the model in the browser moves the hard part from servers to packaging: multithreading needs cross-origin isolation, and offline use means precaching about 33 MB.
- A format shared by four codebases stays honest only when every reader is tested against the same fixtures.
- Consent has to be verified from the recording itself; metadata can be edited.
- End-to-end tests can run the real pipeline when the model is tiny: a 1 KB stand-in voice lets them run without the network and without a 63 MB download.
