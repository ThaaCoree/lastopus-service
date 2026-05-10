package com.TheLastOpus.gameapi.service;

import org.springframework.stereotype.Service;

@Service
public class GameService {

    public int calculateDamage(int atk, int def) {
        int dmg = atk - def;
        return Math.max(dmg, 0);
    }
}