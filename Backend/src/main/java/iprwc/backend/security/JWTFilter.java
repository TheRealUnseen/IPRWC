package iprwc.backend.security;

import com.auth0.jwt.exceptions.JWTVerificationException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
public class JWTFilter extends OncePerRequestFilter {

    private final AccountDetailsService accountDetailsService;
    private final JWTUtil jwtUtil;

    public JWTFilter(AccountDetailsService accountDetailsService, JWTUtil jwtUtil) {
        this.accountDetailsService = accountDetailsService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String bearerToken = request.getHeader("Authorization");

        if(jwtUtil.isValidBearerToken(bearerToken)) {
            String jwtToken = jwtUtil.getJWTTokenFromBearerToken(bearerToken);

            if (jwtUtil.isValidJWTToken(jwtToken)) {
                try {
                    UsernamePasswordAuthenticationToken authenticationToken = getUsernamePasswordAuthenticationToken(jwtToken);

                    if(SecurityContextHolder.getContext().getAuthentication() == null) {
                        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    }
                } catch (JWTVerificationException e) {
                    response.sendError(HttpServletResponse.SC_BAD_REQUEST, "Invalid JWT Token");
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    private UsernamePasswordAuthenticationToken getUsernamePasswordAuthenticationToken(String token) {
        String email = jwtUtil.verifyJWTTokenAndRetrieveAccountEmail(token);
        UserDetails userDetails = accountDetailsService.loadUserByUsername(email);
        return new UsernamePasswordAuthenticationToken(email, userDetails.getPassword(), userDetails.getAuthorities());
    }
}
