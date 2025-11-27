package iprwc.backend.service;

import iprwc.backend.dto.LoginDTO;
import iprwc.backend.exceptions.custom.AlreadyExistsException;
import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Account;
import iprwc.backend.models.enums.AccountType;
import iprwc.backend.repository.AccountRepository;
import iprwc.backend.security.JWTUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private final AccountRepository accountRepository;
    private final JWTUtil jwtUtil;
    private final PasswordService passwordService;
    private final AuthenticationManager authenticationManager;

    public AccountService(AccountRepository accountRepository, JWTUtil jwtUtil, PasswordService passwordService, AuthenticationManager authenticationManager) {
        this.accountRepository = accountRepository;
        this.jwtUtil = jwtUtil;
        this.passwordService = passwordService;
        this.authenticationManager = authenticationManager;
    }

    public String registerAccount(LoginDTO loginDTO) throws AlreadyExistsException {
        if(accountRepository.findByEmail(loginDTO.getEmail()).isPresent()) {
            throw new AlreadyExistsException("An account with this email already exists.");
        }

        String hashedPassword = passwordService.hashPassword(loginDTO.getPassword());
        Account newAccount = new Account(loginDTO.getEmail(), hashedPassword);

        accountRepository.save(newAccount);

        return jwtUtil.generateToken(newAccount.getEmail());
    }

    public String loginIntoAccount(LoginDTO loginDTO) {
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword());

        authenticationManager.authenticate(authenticationToken);

        return jwtUtil.generateToken(loginDTO.getEmail());
    }

    public AccountType getAccountType(String token) throws NotFoundException {
        Account account = getAccountByJWTToken(token);

        return account.getAccountType();
    }

    public Account getAccountByJWTToken(String token) throws NotFoundException {
        String email = jwtUtil.verifyBearerToken(token);
        return accountRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Account not found."));
    }
}
