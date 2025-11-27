package iprwc.backend.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    @Value("${jwt.secret}")
    private String secret;

    private final String subject = "Verification";

    private final String issuer = "Hammer&Saw";

    //Expiration time of JWT token is 1 hour.
    private final int expirationTime = (3600 * 1000);

    public String generateToken(String email) throws IllegalArgumentException, JWTCreationException {
        Date issuedAtDate = new Date();
        Date expirationDate = new Date(issuedAtDate.getTime() + expirationTime);

        return JWT.create()
                .withSubject(subject)
                .withClaim("Email", email)
                .withIssuedAt(issuedAtDate)
                .withExpiresAt(expirationDate)
                .withIssuer(issuer)
                .sign(Algorithm.HMAC512(secret));
    }

    public String verifyJWTTokenAndRetrieveAccountEmail(String token) {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(secret))
                .withSubject(subject)
                .withIssuer(issuer)
                .build();

        DecodedJWT decodedJWT = verifier.verify(token);
        return decodedJWT.getClaim("Email").asString();
    }

    public String verifyBearerToken(String token) {
        token = removeBearerFromToken(token);

        return verifyJWTTokenAndRetrieveAccountEmail(token);
    }

    //This removes "Bearer " from the token to get the actual token.
    private String removeBearerFromToken(String token) {
        return token.substring(7);
    }

    public boolean isValidBearerToken(String token) {
        if (token != null && !token.isBlank() && token.startsWith("Bearer ")) {
            return true;
        }

        return false;
    }

    public boolean isValidJWTToken(String token) {
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("Invalid JWT token.");
        }

        return true;
    }

    public String getJWTTokenFromBearerToken(String token) {
        return removeBearerFromToken(token);
    }
}
