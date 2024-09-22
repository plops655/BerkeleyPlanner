package org.example;

import java.util.ArrayList;
import java.util.List;

public class ProcessedClass {
    class MeetingInfo {

        private int dateFirstMonth;
        private int dateFirstDate;
        private int dateFirstYear;
        private int dateLastMonth;
        private int dateLastDate;
        private int dateLastYear;
        private List<Integer> daysList = new ArrayList<>();
        private int startHour;
        private int startMinute;
        private int endHour;
        private int endMinute;

        public MeetingInfo(String dates, String days, String time) {

            if (!dates.isBlank())  {
                String[] datesInfo = dates.split(" ");

                String startMonth = datesInfo[0];

                switch(startMonth) {
                    case "Jan":
                        dateFirstMonth = 0;
                        break;
                    case "Feb":
                        dateFirstMonth = 1;
                        break;
                    case "Mar":
                        dateFirstMonth = 2;
                        break;
                    case "Apr":
                        dateFirstMonth = 3;
                        break;
                    case "May":
                        dateFirstMonth = 4;
                        break;
                    case "Jun":
                        dateFirstMonth = 5;
                        break;
                    case "Jul":
                        dateFirstMonth = 6;
                        break;
                    case "Aug":
                        dateFirstMonth = 7;
                        break;
                    case "Sep":
                        dateFirstMonth = 8;
                        break;
                    case "Oct":
                        dateFirstMonth = 9;
                        break;
                    case "Nov":
                        dateFirstMonth = 10;
                        break;
                    case "Dec":
                        dateFirstMonth = 11;
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid month: " + startMonth);
                }

                String startDay = datesInfo[1];
                dateFirstDate = Integer.parseInt(startDay);

                String startYear = datesInfo[2];
                dateFirstYear = Integer.parseInt(startYear);

                String endMonth = datesInfo[4];

                switch(endMonth) {
                    case "Jan":
                        dateLastMonth = 0;
                        break;
                    case "Feb":
                        dateLastMonth = 1;
                        break;
                    case "Mar":
                        dateLastMonth = 2;
                        break;
                    case "Apr":
                        dateLastMonth = 3;
                        break;
                    case "May":
                        dateLastMonth = 4;
                        break;
                    case "Jun":
                        dateLastMonth = 5;
                        break;
                    case "Jul":
                        dateLastMonth = 6;
                        break;
                    case "Aug":
                        dateLastMonth = 7;
                        break;
                    case "Sep":
                        dateLastMonth = 8;
                        break;
                    case "Oct":
                        dateLastMonth = 9;
                        break;
                    case "Nov":
                        dateLastMonth = 10;
                        break;
                    case "Dec":
                        dateLastMonth = 11;
                        break;
                    default:
                        throw new IllegalArgumentException("Invalid month: " + startMonth);
                }

                String endDay = datesInfo[5];
                dateLastDate = Integer.parseInt(endDay);

                String endYear = datesInfo[6];
                dateLastYear = Integer.parseInt(endYear);
            }

            if (!days.isBlank()) {
                String[] daysInfo = days.split(", ");
                for (String day: daysInfo) {
                    switch(day) {
                        case "M":
                            daysList.add(0);
                            break;
                        case "TU":
                            daysList.add(1);
                            break;
                        case "W":
                            daysList.add(2);
                        case "TH":
                            daysList.add(3);
                            break;
                        case "F":
                            daysList.add(4);
                            break;
                    }
                }
            }

            if (!time.isBlank()) {
                String[] timeInfo = time.split(" ");
                String[] startTime = timeInfo[0].split(":");
                startHour = Integer.parseInt(startTime[0]);
                startMinute = Integer.parseInt(startTime[1]);
                String[] endTime = timeInfo[3].split(":");
                endHour = Integer.parseInt(endTime[0]);
                endMinute = Integer.parseInt(endTime[1]);
            }
        }
    }

    private String courseName;
    private MeetingInfo meetingInfo;
    private String instructionMode;
    private boolean allowsTimeConflictEnrollment;


    public ProcessedClass(List<String> courseNameList, List<String> meetingInfoList,
                          List<String> instructionModeList, List<String> timeConflictEnrollmentList) {
        courseName = courseNameList.get(0);
        String dates = meetingInfoList.get(0);
        String days = meetingInfoList.get(1);
        String time = meetingInfoList.get(2);
        meetingInfo = new MeetingInfo(dates, days, time);
        instructionMode = instructionModeList.get(0);
        allowsTimeConflictEnrollment = timeConflictEnrollmentList.get(0) == "Time Conflict Enrollment Allowed";
    }
}
