package iprwc.backend.controller;

import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Category;
import iprwc.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAll());
    }

    @GetMapping("/{id}")
    @ResponseBody
    public ResponseEntity<Category> getCategoryById(@PathVariable("id") UUID id) throws NotFoundException {
        return ResponseEntity.ok(categoryService.getById(id));
    }

    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createCategory(@RequestBody Category category, UriComponentsBuilder uriBuilder) {
        Category createdCategory = categoryService.create(category);

        URI location = uriBuilder.path("/api/categories/{id}").buildAndExpand(createdCategory.getId()).toUri();

        return ResponseEntity.created(location).body(createdCategory);
    }

    //@Secured("Admin")
    @PostMapping("/update")
    @ResponseBody
    public ResponseEntity updateCategory(@RequestBody Category category) throws NotFoundException {
        categoryService.update(category);
        return ResponseEntity.ok(category);
    }

    //@Secured("Admin")
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity deleteCategory(@PathVariable("id") UUID id) {
        categoryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
