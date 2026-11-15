package com.maaaaranya.maa_aaranya_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.maaaaranya.maa_aaranya_backend.entity.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {

}