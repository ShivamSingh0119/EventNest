
package com.maaaaranya.maa_aaranya_backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/health")
    public String test() {
        return "Maa Aaranya Backend is Working!";
    }
}
