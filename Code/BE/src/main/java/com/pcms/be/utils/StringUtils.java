package com.pcms.be.utils;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringUtils {
    //Xóa dấu của chuỗi. VD Nguyễn Văn A -> Nguyen Van A
    public static String removeDiacriticalMarks(String text) {
        String normalizedText = Normalizer.normalize(text, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        String result = pattern.matcher(normalizedText).replaceAll("");

        // Xử lý chữ "đ"
        result = result.replace("đ", "d");

        // Xử lý các trường hợp khác
        result = result.replaceAll("[^\\p{ASCII}]", "");

        return result;
    }

    //Kiểm tra xem 3 String có kết hợp thành 1 chuỗi ngày tháng năm hợp lệ không
    public static boolean isValidDateTimeString(String day, String month, String year) {
        // Kiểm tra xem các chuỗi có chỉ chứa chữ số hay không
        if (!day.matches("\\d+") || !month.matches("\\d+") || !year.matches("\\d+")) {
            return false;
        }

        // Chuyển đổi chuỗi thành số nguyên
        int dayInt = Integer.parseInt(day);
        int monthInt = Integer.parseInt(month);
        int yearInt = Integer.parseInt(year);

        // Kiểm tra xem ngày, tháng, năm có hợp lệ hay không
        if (monthInt < 1 || monthInt > 12 || dayInt < 1 || dayInt > 31 || yearInt < 1) {
            return false;
        }

        // Kiểm tra số ngày của từng tháng
        int[] daysInMonth = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        if (monthInt == 2 && isLeapYear(yearInt)) {
            daysInMonth[1] = 29; // Năm nhuận tháng 2 có 29 ngày
        }

        return dayInt <= daysInMonth[monthInt - 1];
    }

    // Kiểm tra năm nhuận
    private static boolean isLeapYear(int year) {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    }
}
