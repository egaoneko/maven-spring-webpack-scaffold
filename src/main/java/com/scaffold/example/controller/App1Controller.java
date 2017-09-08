package com.scaffold.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class App1Controller {
    String message = "Welcome to maven spring webpack scaffold!";

    @RequestMapping("/app1")
    public ModelAndView app1() {
        ModelAndView mv = new ModelAndView("app1");
        mv.addObject("message", message);
        return mv;
    }
}