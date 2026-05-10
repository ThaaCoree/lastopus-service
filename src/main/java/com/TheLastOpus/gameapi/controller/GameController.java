package com.TheLastOpus.gameapi.controller;

import com.TheLastOpus.gameapi.model.DamageRequest;
import com.TheLastOpus.gameapi.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class GameController {

    @Autowired
    private GameService gameService;

    @PostMapping("/damage")
    public int damage(@RequestBody DamageRequest req) {
        return gameService.calculateDamage(req.atk, req.def);
    }
}