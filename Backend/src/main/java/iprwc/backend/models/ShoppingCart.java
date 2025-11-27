package iprwc.backend.models;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import java.sql.Types;
import java.util.UUID;

//@Entity
//@Table(name = "ShoppingCart")
public class ShoppingCart {
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JdbcTypeCode(Types.VARCHAR)
    private UUID id;
}
