package com.example.socialmedia.dto.kafka;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailEvent {
    private String to;
    private String subject;
    private String templateName;   // "welcome", "password-reset"
    private Map<String, Object> variables;

    public String getTo() { return to; }
public String getSubject() { return subject; }
public String getTemplateName() { return templateName; }
public Map<String, Object> getVariables() { return variables; }
}
