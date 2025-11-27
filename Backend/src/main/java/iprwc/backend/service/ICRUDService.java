package iprwc.backend.service;

import iprwc.backend.exceptions.custom.NotFoundException;

import java.util.List;
import java.util.UUID;

public interface ICRUDService<T> {
    List<T> getAll();
    T getById(UUID id) throws NotFoundException;
    T create(T t);
    T update(T t) throws NotFoundException;
    void deleteById(UUID id);
}
