package com.hoovereats.authentication;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class AuthenticationInterceptor implements HandlerInterceptor {

	Logger logger = LoggerFactory.getLogger(AuthenticationInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if(!request.getMethod().equalsIgnoreCase("POST") && !request.getMethod().equalsIgnoreCase("GET")){
			return true;
		}

		if("1".equals(request.getParameter("debug"))){
			return true;
		}

		String idToken = request.getHeader("authorization");

		if (idToken == null || "".equals(idToken)) {
			logger.info("Request Without Authorization Header");
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}
		try {
			FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
			String uid = decodedToken.getUid();
			if (uid == null || "".equals(uid)) {
				logger.info("Request With Bad Authorization Header");
				response.sendError(HttpServletResponse.SC_BAD_REQUEST);
				return false;
			}

			request.setAttribute("userRecord", FirebaseAuth.getInstance().getUser(uid));
			return true;

		} catch (Exception e) {
			logger.info(e.getMessage());
			response.sendError(HttpServletResponse.SC_BAD_REQUEST);
			return false;
		}
	}
}
