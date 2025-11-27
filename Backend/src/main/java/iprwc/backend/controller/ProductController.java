package iprwc.backend.controller;

import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Product;
import iprwc.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAll());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Product> getProductById(@PathVariable("id") UUID id) throws NotFoundException {
        return ResponseEntity.ok(productService.getById(id));
    }

    //@Secured("Admin")
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createProduct(@RequestBody Product product, UriComponentsBuilder uriBuilder) {
        Product createdProduct = productService.create(product);

        URI location = uriBuilder.path("/products/{id}").buildAndExpand(createdProduct.getId()).toUri();

        return ResponseEntity.created(location).body(createdProduct);
    }

    //@Secured("Admin")
    @PostMapping("/update")
    @ResponseBody
    public ResponseEntity updateProduct(@RequestBody Product product) throws NotFoundException {
        productService.update(product);
        return ResponseEntity.ok(product);
    }

    //@Secured("Admin")
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity deleteProduct(@PathVariable("id") UUID id) {
        productService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
