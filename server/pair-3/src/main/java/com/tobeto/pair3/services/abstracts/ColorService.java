package com.tobeto.pair3.services.abstracts;

import com.tobeto.pair3.entities.Color;
import com.tobeto.pair3.services.dtos.requests.CreateColorRequest;
import com.tobeto.pair3.services.dtos.requests.UpdateColorRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllColorResponse;
import com.tobeto.pair3.services.dtos.responses.GetColorResponse;

import java.util.List;

public interface ColorService {


    void add(CreateColorRequest createColorRequest);

  void update(UpdateColorRequest updateColorRequest);

     void delete(int id);
    List<GetAllColorResponse> getAll();

    GetColorResponse getById(int id);

    Color getOriginalColorById(int colorId);
}






















