package com.hoovereats.authenticate;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class AuthenticateController {
	
  @PostMapping("/auth")
	public void index(@RequestHeader Map<String, String> headers) throws FirebaseAuthException {
    FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(headers.get("authorization"));
    String uid = decodedToken.getUid();
	}
}
