package com.tobeto.pair3.services.dtos.requests;

import com.tobeto.pair3.services.dtos.validaton.FileType;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UpdateModelRequest {
    private Integer id;
    private String name;

    private String brandName;
    @FileType
    private String image;
}
