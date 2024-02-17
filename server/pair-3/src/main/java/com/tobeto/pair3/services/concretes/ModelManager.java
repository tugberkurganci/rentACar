package com.tobeto.pair3.services.concretes;

import com.tobeto.pair3.core.exception.BusinessException;
import com.tobeto.pair3.core.messages.Messages;
import com.tobeto.pair3.core.utils.mapper.ModelMapperService;
import com.tobeto.pair3.entities.Brand;
import com.tobeto.pair3.entities.Car;
import com.tobeto.pair3.entities.Model;
import com.tobeto.pair3.entities.Rental;
import com.tobeto.pair3.repositories.ModelRepository;
import com.tobeto.pair3.services.abstracts.BrandService;
import com.tobeto.pair3.services.abstracts.CarService;
import com.tobeto.pair3.services.abstracts.ModelService;
import com.tobeto.pair3.services.abstracts.RentalService;
import com.tobeto.pair3.services.dtos.requests.CreateModelRequest;
import com.tobeto.pair3.services.dtos.requests.GetBrandNameRequest;
import com.tobeto.pair3.services.dtos.requests.GetBrandNameResponse;
import com.tobeto.pair3.services.dtos.requests.UpdateModelRequest;
import com.tobeto.pair3.services.dtos.responses.GetAllModelResponse;
import com.tobeto.pair3.services.dtos.responses.GetModelResponse;
import lombok.AllArgsConstructor;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
@AllArgsConstructor
public class ModelManager implements ModelService {

    private final ModelRepository modelRepository;
    private final ModelMapperService mapperService;

    private final BrandService brandService;

    private final FileService fileService;
    private  final CarService carService;

    private final RentalService rentalService;

    @Override
    public void add(CreateModelRequest createModelRequest) {

        checkIsModelName(createModelRequest.getName());
        Brand brand=brandService.findByName(createModelRequest.getBrandName());
        Model model=new Model();
        model.setName(createModelRequest.getName());
        model.setBrand(brand);
        if (createModelRequest.getImage() != null) {
            String fileName = fileService.saveBase64StringAsFile(createModelRequest.getImage(), "model");
            model.setImage(fileName);
        }
        modelRepository.save(model);
    }

    @Override
    public void update(UpdateModelRequest updateModelRequest) {

        Model model = this.getOriginalModelById(updateModelRequest.getId());
        Brand brand = brandService.findByName(updateModelRequest.getBrandName());
        model.setId(updateModelRequest.getId());
        model.setName(updateModelRequest.getName());
        model.setBrand(brand);

        if (updateModelRequest.getImage() != null) {
            fileService.deleteCarImage(model.getImage(),"car");
            String fileName = fileService.saveBase64StringAsFile(updateModelRequest.getImage(), "model");
            model.setImage(fileName);
        }
        modelRepository.save(model);
    }

    @Override
    public void delete(Integer id) {
        Model model = this.getOriginalModelById(id);
        for (Car car:model.getCars()) {
            List<Rental> rentals=carService.getOriginalCarById(car.getId()).getRentals();
            for (Rental rental:rentals
            ) {
                rental.setCar(null);
                rentalService.updateRental(rental);
            }

        }
        modelRepository.delete(model);

    }

    @Override
    public List<GetAllModelResponse> getAll() {
        List<Model> modelList = modelRepository.findAll();
        return modelList.stream().map(
                model -> mapperService.forResponse().map(model, GetAllModelResponse.class)
        ).toList();
    }

    @Override
    public Model getOriginalModelById(int modelId) {
        return modelRepository.findById(modelId).orElseThrow(() -> new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.notfound", LocaleContextHolder.getLocale()))));
    }

    @Override
    public Page<GetAllModelResponse> getAllViaPage(Pageable pageable) {
        return modelRepository.findAll(pageable).map(model -> mapperService.forResponse().map(model, GetAllModelResponse.class));
    }

    @Override
    public GetModelResponse getById(Integer id) {
        Model model = this.getOriginalModelById(id);
        return mapperService.forResponse().map(model, GetModelResponse.class);
    }

    private void checkIsModelName(String modelName) {
        if (modelRepository.existsByName(modelName)) {
            throw new BusinessException((Messages.getMessageForLocale("rentACar.exception.model.exists", LocaleContextHolder.getLocale())));
        }
    }

    @Override
    public Model findByModelName(String modelName) {
        return modelRepository.findByName(modelName);
    }
}
