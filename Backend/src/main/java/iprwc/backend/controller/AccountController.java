package iprwc.backend.controller;

import iprwc.backend.dto.LoginDTO;
import iprwc.backend.exceptions.custom.AlreadyExistsException;
import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.service.AccountService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/account")
public class AccountController {

    private final AccountService accountService;

    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity registerAccount(@RequestBody LoginDTO loginDTO) throws AlreadyExistsException {
        return ResponseEntity.ok(accountService.registerAccount(loginDTO));
    }

    @PostMapping("/login")
    @ResponseBody
    public ResponseEntity loginIntoAccount(@RequestBody LoginDTO loginDTO) {
        return ResponseEntity.ok(accountService.loginIntoAccount(loginDTO));
    }

    @GetMapping("/type")
    @ResponseBody
    public ResponseEntity getRole(@RequestHeader("Authorization") String jwtToken) throws NotFoundException {
        return ResponseEntity.ok(accountService.getAccountType(jwtToken).ordinal());
    }
}
