
package com.maaaaranya.maa_aaranya_backend.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.maaaaranya.maa_aaranya_backend.entity.Booking;
import com.maaaaranya.maa_aaranya_backend.service.BookingService;
import org.springframework.web.bind.annotation.GetMapping;
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.saveBooking(booking);
    }

@GetMapping
public java.util.List<Booking> getAllBookings() {
    return bookingService.getAllBookings();
}

}
