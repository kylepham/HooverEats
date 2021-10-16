package com.hoovereats.authenticate;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;

@Service
public class FirebaseInitialize {
	@PostConstruct
	public void initialize() {
		try {
			FileInputStream serviceAccount =
					new FileInputStream("/etc/firebase/hoovereats-67e7a-firebase-adminsdk-5qg4a-f9213ee288.json");
			FirebaseOptions options = new FirebaseOptions.Builder()
					.setCredentials(GoogleCredentials.fromStream(serviceAccount))
					.setDatabaseUrl("https://chatapp-e6e15.firebaseio.com")
					.build();
			FirebaseApp.initializeApp(options);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
