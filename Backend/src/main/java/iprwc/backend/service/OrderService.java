package iprwc.backend.service;

import iprwc.backend.dto.OrderDTO;
import iprwc.backend.dto.OrderItemDTO;
import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Account;
import iprwc.backend.models.Order;
import iprwc.backend.models.OrderItem;
import iprwc.backend.models.enums.OrderStatus;
import iprwc.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AccountService accountService;
    private final ProductService productService;

    public OrderService(OrderRepository orderRepository, AccountService accountService, ProductService productService) {
        this.orderRepository = orderRepository;
        this.accountService = accountService;
        this.productService = productService;
    }

    public List<Order> getAll(String token) throws NotFoundException {
        Account account = accountService.getAccountByJWTToken(token);
        return orderRepository.findByAccountId(account.getId());
    }

    public Order create(String token, OrderDTO orderDTO) throws NotFoundException {
        Order order = ConvertOrderDTOTOOrder(token, orderDTO);
        return orderRepository.save(order);
    }

    public Order update(Order order) throws NotFoundException {
        return null;
    }

    public void deleteById(UUID id) {

    }

    private Order ConvertOrderDTOTOOrder(String token, OrderDTO orderDTO) throws NotFoundException {
        Account account = accountService.getAccountByJWTToken(token);

        Order order = new Order();
        order.setAccount(account);
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(orderDTO.getStatus());

        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDTO itemDTO : orderDTO.getOrderItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setQuantity(itemDTO.getQuantity());
            orderItem.setPrice(itemDTO.getPrice());
            orderItem.setProduct(productService.getById(itemDTO.getProductId()));
            orderItem.setOrder(order);
            orderItems.add(orderItem);
        }

        order.setOrderItems(orderItems);

        return order;
    }
}
