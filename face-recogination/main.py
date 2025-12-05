import cv2
import face_recognition
import os
import pickle
import webbrowser

MODEL_FILE = "model.pkl"


# ---------------------------
#  AUTO MODEL TRAINING
# ---------------------------
def create_model():
    print("\n=== MODEL NOT FOUND — CREATING NEW MODEL ===\n")
    
    names = []
    encodings = []
    
    for person in ["You", "Your Biwi"]:
        print(f"\n📸 Capturing face for: {person}")
        
        cap = cv2.VideoCapture(0)
        samples = 0
        collected_enc = []
        
        while samples < 12:
            ret, frame = cap.read()
            cv2.putText(frame, f"Capturing {samples}/12", (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 255), 2)

            cv2.imshow("Face Capture", frame)
            key = cv2.waitKey(1)

            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            face_loc = face_recognition.face_locations(rgb)
            face_enc = face_recognition.face_encodings(rgb, face_loc)

            if len(face_enc) > 0:
                collected_enc.append(face_enc[0])
                samples += 1

        cap.release()
        cv2.destroyAllWindows()

        avg_enc = sum(collected_enc) / len(collected_enc)

        name = person.replace(" ", "_").lower()
        names.append(name)
        encodings.append(avg_enc)

        print(f"✔ {person} face model created")

    # Save model
    with open(MODEL_FILE, "wb") as f:
        pickle.dump([names, encodings], f)

    print("\n🎉 MODEL CREATED SUCCESSFULLY!")
    print("-----------------------------------------\n")


# ---------------------------
#  RECOGNITION SYSTEM
# ---------------------------
def recognize():
    with open(MODEL_FILE, "rb") as f:
        names, encs = pickle.load(f)

    print("\nModel loaded. Starting camera...")

    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        faces = face_recognition.face_locations(rgb)
        enc = face_recognition.face_encodings(rgb, faces)

        for encoding, location in zip(enc, faces):
            matches = face_recognition.compare_faces(encs, encoding, tolerance=0.46)
            name = "Unknown"

            if True in matches:
                idx = matches.index(True)
                name = names[idx]

                print(f"\n💖 MATCH FOUND: {name}")
                print("Unlocking...")

                # Open surprise HTML
                webbrowser.open("file:///C:/Users/rudra/Desktop/yourgift/index.html")

                cap.release()
                cv2.destroyAllWindows()
                return

            # Draw face box
            top, right, bottom, left = location
            cv2.rectangle(frame, (left, top), (right, bottom), (255, 0, 255), 2)
            cv2.putText(frame, name, (left, top - 5),
                        cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 255), 2)

        cv2.imshow("Face Recognition Login", frame)

        if cv2.waitKey(1) == 27:
            break

    cap.release()
    cv2.destroyAllWindows()


# ---------------------------
# MAIN LOGIC
# ---------------------------
if not os.path.exists(MODEL_FILE):
    create_model()

recognize()
