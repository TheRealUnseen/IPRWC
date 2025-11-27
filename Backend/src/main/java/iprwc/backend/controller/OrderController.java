package iprwc.backend.controller;

import iprwc.backend.dto.OrderDTO;
import iprwc.backend.exceptions.custom.NotFoundException;
import iprwc.backend.models.Order;
import iprwc.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @ResponseBody
    public ResponseEntity<List<Order>> getAllOrders(@RequestHeader("Authorization") String jwtToken) throws NotFoundException {
        return ResponseEntity.ok(orderService.getAll(jwtToken));
    }

    //@Secured("Admin")
    @PostMapping("/create")
    @ResponseBody
    public ResponseEntity createOrder(@RequestHeader("Authorization") String jwtToken, @RequestBody OrderDTO orderDTO, UriComponentsBuilder uriBuilder) throws NotFoundException {
        Order createdOrder = orderService.create(jwtToken, orderDTO);

        URI location = uriBuilder.path("/orders/{id}").buildAndExpand(createdOrder.getId()).toUri();

        return ResponseEntity.created(location).body(createdOrder);
    }

    //@Secured("Admin")
    @PostMapping("/update")
    @ResponseBody
    public ResponseEntity updateOrder(@RequestBody Order order) throws NotFoundException {
        orderService.update(order);
        return ResponseEntity.ok(order);
    }

    //@Secured("Admin")
    @DeleteMapping("/{id}")
    @ResponseBody
    public ResponseEntity deleteOrder(@PathVariable("id") UUID id) {
        orderService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
