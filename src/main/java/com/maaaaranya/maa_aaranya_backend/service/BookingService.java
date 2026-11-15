
package com.maaaaranya.maa_aaranya_backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.maaaaranya.maa_aaranya_backend.entity.Booking;
import com.maaaaranya.maa_aaranya_backend.repository.BookingRepository;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
