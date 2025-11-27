package iprwc.backend.models;

import com.fasterxml.jackson.annotation.JsonProperty;
import iprwc.backend.models.enums.AccountType;
import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import java.sql.Types;
import java.util.UUID;

@Entity
@Table(name = "Account")
public class Account {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(Types.VARCHAR)
    private UUID id;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    private AccountType accountType;

    public Account() {
        this("","");
    }

    public Account(String email, String password) {
        this.email = email;
        this.password = password;
        this.accountType = AccountType.Customer;
    }

    public UUID getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public AccountType getAccountType() {
        return accountType;
    }
}