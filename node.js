import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCRWYpbVZzvhYlRwO6e-fSQnPj1kyl5t0k", 
    authDomain: "testled-60066.firebaseapp.com",
    databaseURL: "https://testled-60066-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "testled-60066",
    storageBucket: "testled-60066.firebasestorage.app",
    messagingSenderId: "468520882818", 
    appId: "1:468520882818:web:xxxxxxxxxxxxxxxxxxxx"
};

// C. INISIALISASI FIREBASE
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// D. VARIABEL GLOBAL (Harus didefinisikan untuk digunakan di fungsi Anda)
const loginForm = document.getElementById("loginForm"); // Asumsi ID form Anda
const dashboard = document.getElementById("dashboard"); // Asumsi ID dashboard Anda

//LOGIN DAN LOGOUT
document.getElementById("loginBtn").addEventListener("click", () => {
        const email = document.getElementById("email").value;
        const pass = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                loginForm.style.display = "none";
                dashboard.style.display = "block";
                listenToSensors();
            })
            .catch(err => alert("Login gagal: " + err.message));
    });
document.getElementById("logoutBtn").addEventListener("click", () => {
    signOut(auth).then(() => {
        dashboard.style.display = "none";
        loginForm.style.display = "block";
    });
});

//MENAMPILKAN DATA SENSOR 
        function listenToSensors() {
                const sensorRef = ref(db, "greenhouse/sensors");

                onValue(sensorRef, (snapshot) => {
                    const d = snapshot.val() || {};

                    updateSoil(d.soilMoisture);
                        updateLight(d.lightLevel);
                updateMotion(d.motion);
                });
            }
        function updateSoil (value) {
                document.getElementById("soilMoisture").innerText = value + " %";
                const status = value < 30 ? "Kering" : value < 70 ? "Cukup": "Basah";
                document.getElementById("soilStatus").innerText = status;
            }
        function updatelight (value) {
                document.getElementById("lightLevel").innerText = value + " %";
                const status = value < 30 ? "Redup": value < 70? "Cukup": "Terang";
                document.getElementById("lightStatus").innerText = status;
            } 
        function updateMotion (value) {
                document.getElementById("motion").innerText = value ? "Terdeteksi": "Tidak Terdeteksi";
                const status = value ? "Ada Gerakan" : "Aman";
                document.getElementById("motionStatus").innerText = status;
        }