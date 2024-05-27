package com.pcms.be.functions;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import java.util.Base64;

public interface Constants {
    String IMAGE_DEFAULT_BASE64 = "iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXp7vG6vsG3u77s8fTCxsnn7O/f5OfFyczP09bM0dO8wMPk6ezY3eDd4uXR1tnJzdBvAX/cAAACVElEQVR4nO3b23KDIBRA0ShGU0n0//+2KmO94gWZ8Zxmr7fmwWEHJsJUHw8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwO1MHHdn+L3rIoK6eshsNJ8kTaJI07fERPOO1Nc1vgQm2oiBTWJ+d8+CqV1heplLzMRNonED+4mg7L6p591FC+133/xCRNCtd3nL9BlxWP++MOaXFdEXFjZ7r8D9l45C8y6aG0cWtP/SUGhs2d8dA/ZfGgrzYX+TVqcTNRRO9l+fS5eSYzQs85psUcuzk6igcLoHPz2J8gvzWaH/JLS+95RfOD8o1p5CU5R7l5LkfKEp0mQ1UX7hsVXqDpRrifILD/3S9CfmlUQFhQfuFu0STTyJ8gsP3PH7GVxN1FC4t2sbBy4TNRTu7LyHJbqaqKFw+/Q0ncFloo7CjRPwMnCWqKXQZ75El4nKC9dmcJaou9AXOE5UXbi+RGeJygrz8Uf+GewSn9uXuplnWDZJ7d8f24F/s6iq0LYf9olbS3Q8i5oKrRu4S9ybwaQ/aCkqtP3I28QDgeoK7TBya/aXqL5COx67PTCD2grtdOwH+pQV2r0a7YVBgZoKwwIVFQYG6ikMDVRTGByopjD8ATcKb0UhhRTe77sKs2DV7FKSjId18TUEBYVyLhUThWfILHTDqmI85/2RWWjcE/bhP6OD7maT3h20MHsA47JC3PsW0wcwLhv9t0OOPOIkCn21y2bXXwlyylxiYMPk1SuCSmpfK8bNQvIrpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwNX4BCbAju9/X67UAAAAASUVORK5CYII=";

    static ResponseEntity<byte[]> getImageDefault() {
        HttpHeaders headers = new HttpHeaders();
        headers.set(HttpHeaders.ACCEPT_RANGES, "bytes");
        headers.setContentType(MediaType.IMAGE_PNG);
        return ResponseEntity.ok().headers(headers).body(Base64.getDecoder().decode(IMAGE_DEFAULT_BASE64));
    }
    enum RoleEnum {
        LEADER("EOFFICE_LEADER"),
        CLERICAL("EOFFICE_CLERICAL");

        @Getter
        @Setter
        public String value;

        RoleEnum(String value) {
            this.value = value;
        }

        public static RoleEnum fromValue(String value) {
            for (RoleEnum v : values()) {
                if (v.getValue().equalsIgnoreCase(value)) {
                    return v;
                }
            }
            return null;
        }
    }

    interface RoleConstants {
        String ADMIN = "ADMIN";
        String SUPER_ADMIN = "SUPER_ADMIN";
        String STAFF = "STAFF";
        String SECRETARY = "SECRETARY";
        String MENTOR_LEADER = "MENTOR_LEADER";
        String MENTOR = "MENTOR";
        String STUDENT = "STUDENT";
    }
     interface MemberRole {
         String OWNER="OWNER";
         String MEMBER="MEMBER";

    }
    interface GroupStatus {
        String PENDING = "PENDING";
        String ACCEPTED = "ACCEPTED";
        String SUBMITTED = "SUBMITTED";
        String REJECT = "REJECT";
    }
    interface MemberStatus {
        String PENDING = "PENDING";
        String APPROVAL = "APPROVAL";
        String REJECT = "REJECT";
    }
}
