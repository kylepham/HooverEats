package com.hoovereats.authenticate;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthenticationInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		if(!request.getMethod().equalsIgnoreCase("POST")){
			return true;
		}

		String idToken = request.getHeader("authorization");
		if (idToken == null || "".equals(idToken)) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}
		try {
			FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
			String uid = decodedToken.getUid();
			if (uid == null || "".equals(uid)) {
				response.sendError(HttpServletResponse.SC_BAD_REQUEST);
				return false;
			}

			request.setAttribute("userRecord", FirebaseAuth.getInstance().getUser(uid));
			return true;

		} catch (Exception e) {
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}
	}
}
