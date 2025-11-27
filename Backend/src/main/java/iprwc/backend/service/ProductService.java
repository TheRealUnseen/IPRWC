package iprwc.backend.service;

import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Category;
import iprwc.backend.models.Product;
import iprwc.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService implements ICRUDService<Product>{

    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    public List<Product> getAll() {
        return productRepository.findAll();
    }

    public Product getById(UUID id) throws NotFoundException {
        return findProductById(id);
    }

    public Product create(Product product) {
        return productRepository.save(product);
    }

    public Product update(Product prod) throws NotFoundException {
        Product product = findProductById(prod.getId());
        Category category = this.categoryService.findCategoryById(prod.getCategory().getId());

        product.setName(prod.getName());
        product.setCategory(category);
        product.setDescription(prod.getDescription());
        product.setPrice(prod.getPrice());
        product.setImageName(prod.getImageName());

        return productRepository.save(product);
    }

    public void deleteById(UUID id) {
        productRepository.deleteById(id);
    }

    private Product findProductById(UUID id) throws NotFoundException {
        if(id == null) {
            throw new NotFoundException("Product not found!");
        }

        Optional<Product> product = productRepository.findById(id);

        if (!product.isPresent()) {
            throw new NotFoundException("Product not found!");
        }

        return product.get();
    }
}
