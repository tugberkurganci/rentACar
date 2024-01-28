package com.tobeto.pair3.controllers;

import com.tobeto.pair3.services.abstracts.ColorService;
import com.tobeto.pair3.services.dtos.requests.CreateColorRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateColorRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetBrandResponse;
import com.tobeto.pair3.services.dtos.responses.GetColorResponse;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/colors")
@AllArgsConstructor
public class ColorController {

   private final ColorService colorService;

   @PostMapping
   public void add (@RequestBody @Valid CreateColorRequest createColorRequest ){
      colorService.add(createColorRequest);
   }
   @PutMapping("{id}")
   public void update (@RequestBody UpdateColorRequest updateColorRequest ){
      colorService.update(updateColorRequest);
   }
   @DeleteMapping("{id}")
   public void delete (@PathVariable("id") Integer id ){
      colorService.delete(id);
   }
   @GetMapping
   public List<GetAllColorResponse> getAll(){

      return colorService.getAll();
   }
   @GetMapping("{id}")
   public GetColorResponse getById(@PathVariable("id")  Integer id){
      return colorService.getById(id);
   }
}


























