---
title: "How AI Pose Detection Counts Your Reps (Behind the Tech)"
description: "How does RepsForReels know you did a real pushup? A deep dive into the AI pose detection technology that verifies every rep — MediaPipe, landmark tracking, and on-device processing explained."
date: "2026-02-23"
author: "Aman Verma"
authorTitle: "Founder, RepsForReels"
authorImage: "/blog/authors/aman.webp"
authorTwitter: "@repsforreels"
authorBio: "Founder of RepsForReels, building tools to help people reclaim their time from screens through exercise. Previously struggled with 9+ hours of daily screen time."
category: "Product Updates"
tags: ["AI pose detection", "technology", "pushup counter", "rep counter", "MediaPipe", "exercise detection", "machine learning"]
image: "/blog/images/ai-pose-detection-hero.webp"
imageAlt: "AI skeleton overlay on a person doing pushups, showing landmark tracking points"
readTime: 11
wordCount: 2500
featured: false
faq:
  - question: "How does AI pose detection count pushups?"
    answer: "AI pose detection identifies 33 body landmarks (joints, shoulders, hips, etc.) from your camera feed. For pushups, it tracks the angle at your elbows and shoulders. When the angle drops below a threshold (arms bent) and rises back up (arms extended), that's counted as one rep. All processing happens on-device in real-time."
  - question: "Is AI rep counting accurate?"
    answer: "RepsForReels uses Google's MediaPipe pose detection which identifies body landmarks with high precision. The angle-based state machine only counts complete reps with proper form. In testing, accuracy is above 95% when the full body is visible to the camera."
  - question: "Does the AI pose detection record video?"
    answer: "No. RepsForReels processes camera frames in real-time to detect body landmarks, but never records, stores, or transmits any images or video. All AI processing happens locally on your device using on-device machine learning. Your privacy is fully protected."
  - question: "Can you cheat AI pose detection?"
    answer: "The AI tracks 33 specific body landmarks and uses angle-based detection through a state machine. Simply waving your arms or moving your phone won't register as reps. You need to perform the actual exercise movement through its full range of motion for the AI to count it."
  - question: "What is MediaPipe pose detection?"
    answer: "MediaPipe is Google's open-source framework for on-device machine learning. Its pose detection model identifies 33 body landmarks from a camera feed in real-time. RepsForReels uses MediaPipe's full pose landmarker model, which runs at approximately 30 frames per second on modern smartphones."
---

"How does RepsForReels know I actually did a pushup?"

It's the first question everyone asks — and it's a fair one. If an app is going to gate your social media access behind exercise, the detection better be accurate.

The short answer: AI pose detection using Google's MediaPipe framework, running entirely on your phone, analyzing your body position 30 times per second.

The longer answer involves landmark tracking, angle mathematics, state machines, and a One Euro filter. Here's how it all works.

## The Pipeline: From Camera to Rep Count

Every time you open the exercise camera in RepsForReels, here's what happens — 30 times every second:

```
Camera frame
  → MediaPipe pose landmarker (identifies 33 body points)
  → Coordinate mapping (camera → screen space)
  → Landmark smoothing (removes jitter)
  → Angle calculation (joint angles)
  → State machine (UP → TRANSITION → DOWN → TRANSITION → UP = 1 rep)
  → Rep count updated
```

Let's break down each stage.

## Stage 1: MediaPipe Pose Detection

The foundation is [Google's MediaPipe](https://ai.google.dev/edge/mediapipe/solutions/vision/pose_landmarker), an open-source framework for on-device machine learning. RepsForReels uses MediaPipe's **Pose Landmarker** model — specifically the "full" variant (~13.9MB).

Why "full" and not "heavy" (~29MB)? Performance. The full model runs at approximately 30ms per frame on a modern smartphone CPU, compared to ~80ms for the heavy model. For real-time rep counting, speed matters more than marginal accuracy gains.

### What the model sees

MediaPipe identifies **33 landmarks** on your body:

- **Face**: Nose, eyes, ears, mouth corners
- **Upper body**: Shoulders, elbows, wrists
- **Core**: Hips
- **Lower body**: Knees, ankles, heels, toes

Each landmark comes with an (x, y, z) coordinate and a visibility confidence score. For pushup detection, the key landmarks are **shoulders, elbows, and wrists**. For squats, it's **hips, knees, and ankles**.

### On-device processing

This is critical: **the entire model runs on your phone**. No camera frames are ever sent to a server. No images are stored. The model processes each frame, outputs landmark coordinates, and the frame is immediately discarded.

This isn't just a privacy feature — it's a performance requirement. Sending frames to a server would add 100-500ms of latency per frame, making real-time rep counting impossible.

## Stage 2: Coordinate Mapping

Raw MediaPipe landmarks are in a normalized coordinate space (0.0 to 1.0). RepsForReels maps these to the actual screen dimensions so the skeleton overlay lines up with your body on the camera preview.

The mapping accounts for:
- **Camera resolution** vs. screen resolution
- **Front-facing camera mirroring** (your left arm appears on the right side of the preview)
- **Device orientation** (portrait mode for exercise)

This stage is purely visual — it affects the skeleton overlay you see on screen, not the detection accuracy.

## Stage 3: Landmark Smoothing

Raw landmark data from MediaPipe jitters. Even when you hold perfectly still, the detected position of your elbow might bounce by a few pixels between frames. This is normal for any vision model, but it looks terrible on screen.

RepsForReels uses a **One Euro filter** to smooth landmark positions. The One Euro filter is a simple but effective algorithm specifically designed for real-time signal smoothing:

- **Low jitter when still**: When a landmark isn't moving much, the filter applies heavy smoothing
- **Low lag when moving**: When a landmark moves quickly (during a pushup), the filter reduces smoothing to stay responsive

The key insight: **smoothing only affects the visual overlay**, not the rep detection. The detection pipeline uses the raw (unsmoothed) angles to count reps. This means the skeleton looks smooth on screen while the rep counter stays accurate and responsive.

Filter parameters are tuned per exercise:
- **Default**: `minCutoff: 0.8, beta: 0.01` — balanced for general use
- **Jittery preset**: More aggressive smoothing for devices with noisier cameras
- **Stable preset**: Less smoothing, more responsive feel

## Stage 4: Angle Calculation

This is where geometry turns into exercise detection. RepsForReels calculates **joint angles** from three landmarks:

### For Pushups
The primary angle is at the **elbow**: formed by the shoulder, elbow, and wrist landmarks.

- **Arms extended** (top of pushup): Elbow angle ≈ 160-180°
- **Arms bent** (bottom of pushup): Elbow angle ≈ 60-90°

The app also tracks shoulder angle (between hip, shoulder, and elbow) to verify you're maintaining a plank position, not just bending your arms while standing.

### For Squats
The primary angle is at the **knee**: formed by the hip, knee, and ankle landmarks.

- **Standing** (top of squat): Knee angle ≈ 160-180°
- **Squatting** (bottom): Knee angle ≈ 70-100°

Hip angle is also tracked to ensure you're actually descending, not just bending your knees slightly.

### The math

Angle calculation uses the standard three-point angle formula:

```
angle = arctan2(C.y - B.y, C.x - B.x) - arctan2(A.y - B.y, A.x - B.x)
```

Where A, B, C are three landmarks and B is the joint. This gives us the angle in degrees, which feeds into the state machine.

## Stage 5: The State Machine (How Reps Are Actually Counted)

This is the heart of the system. A **direction-based state machine** tracks your exercise through its full range of motion:

```
        ┌──────────────┐
        │     UP       │  (arms extended / standing)
        └──────┬───────┘
               │ angle decreasing
        ┌──────▼───────┐
        │  TRANSITION  │  (moving down)
        └──────┬───────┘
               │ angle below threshold
        ┌──────▼───────┐
        │    DOWN      │  (arms bent / squatting)
        └──────┬───────┘
               │ angle increasing
        ┌──────▼───────┐
        │  TRANSITION  │  (moving up)
        └──────┬───────┘
               │ angle above threshold
        ┌──────▼───────┐
        │     UP       │  ← REP COUNTED HERE
        └──────────────┘
```

A rep is counted when you complete the **full cycle**: UP → DOWN → UP.

This means:
- **Half reps don't count** — you need to go all the way down AND all the way back up
- **Holding at the bottom doesn't count** — you need to return to the start position
- **Bouncing doesn't double-count** — the state machine requires a clean transition through all states

### Direction-based detection

Rather than relying on absolute angle thresholds alone, the state machine also tracks the **direction** of angle change. The angle must be consistently decreasing (going down) to enter the DOWN state, and consistently increasing (going up) to return to UP.

This prevents false counts from:
- Minor angle fluctuations during a hold
- Camera jitter
- Non-exercise movements

## Why This Approach Is Hard to Cheat

People always ask: "Can I just wave my arms and get credit?"

No. Here's why:

1. **Full range of motion required**: The state machine requires the elbow angle to go from above ~150° to below ~90° and back. Simply waving doesn't produce this angle pattern.

2. **Multiple landmarks must be consistent**: The app checks both elbow angle AND shoulder position. Random arm movement produces inconsistent landmark patterns that don't match exercise form.

3. **Temporal consistency**: The state machine requires smooth, continuous movement through the full cycle. Jerky or random movements trigger state machine resets.

4. **Visibility thresholds**: If key landmarks aren't visible with sufficient confidence (e.g., your camera isn't pointed at your body), reps aren't counted.

Could someone figure out how to perfectly mimic the joint angles of a pushup without actually doing one? Theoretically, but at that point you'd expend more effort cheating than just doing the pushup.

## Performance: Why It Runs at 30fps on Your Phone

The full MediaPipe pose model runs inference in ~30ms on a modern smartphone. That's real-time — 30+ frames per second of accurate pose detection.

How? Three reasons:

1. **Model optimization**: The "full" model uses a MobileNet backbone optimized for mobile inference. It's quantized (reduced precision math) and uses operations that map efficiently to mobile CPUs and GPUs.

2. **On-device processing**: No network latency. The model runs as a native library, not through a web view or JavaScript bridge.

3. **Efficient pipeline**: RepsForReels processes camera frames through a VisionCamera frame processor, which operates on raw camera buffers without costly format conversions.

Battery impact is minimal for a typical session (2-5 minutes of exercise). The camera and model only run when you're actively doing your reps.

## Privacy by Design

Let's be explicit about what happens to your camera data:

- **Camera frames are processed in real-time**: Each frame is analyzed for body landmarks, then immediately discarded
- **No images or video are ever stored**: Not on your device, not in the cloud, not anywhere
- **No data leaves your device**: The entire ML pipeline runs locally
- **No internet required**: Pose detection works completely offline
- **Landmark coordinates are ephemeral**: Used only for the current frame's calculations, then overwritten

This isn't just a privacy policy claim — it's an architectural decision. The camera feed goes through a native frame processor that extracts landmarks and never exposes the raw image to JavaScript or any storage layer.

## What's Next for Exercise Detection

The current system handles pushups and squats with high accuracy. The underlying architecture — landmark detection → angle calculation → state machine — is designed to be extensible:

- **More exercises**: The same pipeline can detect lunges, sit-ups, and jumping jacks by configuring different landmark combinations and angle thresholds
- **Form feedback**: Future versions could provide real-time form corrections ("Go lower on your squat" or "Keep your back straight")
- **Rep quality scoring**: Instead of binary count/don't-count, rate each rep on form quality

The foundation is solid. As the model and detection logic improve, the exercise verification only gets more accurate and harder to fool.

## Try It Yourself

The best way to understand how AI pose detection works is to see it in action. [Download RepsForReels](https://repsforreels.app), open the exercise camera, and watch the skeleton overlay track your movements in real-time.

Then do five pushups and earn five minutes of guilt-free scrolling. That's the whole point.
