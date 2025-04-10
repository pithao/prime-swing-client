// stores/userSlice.js
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config"; // adjust path if needed


const userSlice = (set) => ({
  user: null,
  role: null,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  clearUser: () => set({ user: null, role: null }),
  fetchUser: async () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        set({ user });

        // 🔥 Fetch role from Firestore
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          set({ role: userData.role || null });
        } else {
          set({ role: null });
        }
      } else {
        set({ user: null, role: null });
      }
    });
  }
});

export default userSlice;