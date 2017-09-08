package com.scaffold.example.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class App2Controller {
    String message = "Welcome to maven spring webpack scaffold!";

    @RequestMapping("/app2")
    public ModelAndView app2() {
        ModelAndView mv = new ModelAndView("app2");
        mv.addObject("message", message);
        return mv;
    }
}