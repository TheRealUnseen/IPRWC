package iprwc.backend.service;

import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Category;
import iprwc.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CategoryService implements ICRUDService<Category> {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAll() {
        return categoryRepository.findAll();
    }

    public Category getById(UUID id) throws NotFoundException {
        return findCategoryById(id);
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Category cat) throws NotFoundException {
        Category category = findCategoryById(cat.getId());

        category.setName(cat.getName());

        return categoryRepository.save(category);
    }

    public void deleteById(UUID id) {
        categoryRepository.deleteById(id);
    }

    public Category findCategoryById(UUID id) throws NotFoundException {
        if(id == null) {
            throw new NotFoundException("Category not found");
        }

        Optional<Category> category = categoryRepository.findById(id);

        if (!category.isPresent()) {
            throw new NotFoundException("Category not found");
        }

        return category.get();
    }
}
