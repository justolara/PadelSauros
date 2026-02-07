import { initializeApp } from "https://www.gstatic.com";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com";

const firebaseConfig = {
  apiKey: "AIzaSyB07P8AG1WXnOlr0vxHNJFrCBbGTf_v_7M",
  authDomain: "padelsauros.firebaseapp.com",
  databaseURL: "https://padelsauros-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "padelsauros",
  storageBucket: "padelsauros.firebasestorage.app",
  messagingSenderId: "506820255898",
  appId: "1:506820255898:web:f3b9b75f732afb8036ff23"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// FUNCION PARA GUARDAR (Se vincula al botón Guardar)
window.guardarPartido = function(idPartido) {
    const p = document.getElementById(idPartido);
    const datos = {
        p1: {
            s1: p.querySelector('.p1-s1').value,
            s2: p.querySelector('.p1-s2').value,
            s3: p.querySelector('.p1-s3').value
        },
        p2: {
            s1: p.querySelector('.p2-s1').value,
            s2: p.querySelector('.p2-s2').value,
            s3: p.querySelector('.p2-s3').value
        }
    };

    set(ref(db, 'resultados/' + idPartido), datos)
        .then(() => alert("✅ ¡Resultado guardado en la nube!"))
        .catch((error) => alert("❌ Error: " + error.message));
};

// LEER DATOS EN TIEMPO REAL (Para que no se borren al refrescar)
onValue(ref(db, 'resultados/'), (snapshot) => {
    const data = snapshot.val();
    if (data) {
        Object.keys(data).forEach(id => {
            const partidoDiv = document.getElementById(id);
            if (partidoDiv) {
                partidoDiv.querySelector('.p1-s1').value = data[id].p1.s1;
                partidoDiv.querySelector('.p1-s2').value = data[id].p1.s2;
                partidoDiv.querySelector('.p1-s3').value = data[id].p1.s3;
                partidoDiv.querySelector('.p2-s1').value = data[id].p2.s1;
                partidoDiv.querySelector('.p2-s2').value = data[id].p2.s2;
                partidoDiv.querySelector('.p2-s3').value = data[id].p2.s3;
            }
        });
    }
});

// FUNCIONES DE INTERFAZ
window.cambiarLiga = function(ligaId, btn) {
    document.querySelectorAll('.liga-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.btn-liga').forEach(b => b.classList.remove('active'));
    document.getElementById(ligaId).classList.add('active');
    btn.classList.add('active');
};

window.toggleJornada = function(id) {
    const x = document.getElementById(id);
    x.style.display = (x.style.display === "none" || x.style.display === "") ? "block" : "none";
};
