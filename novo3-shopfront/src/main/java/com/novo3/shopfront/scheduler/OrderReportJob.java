package com.novo3.shopfront.scheduler;

import com.novo3.shopfront.service.ReportService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.text.SimpleDateFormat;
import java.util.Date;

@Component
@Slf4j
@AllArgsConstructor
public class OrderReportJob {

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");

    private final ReportService reportService;

    //@Scheduled(cron = "*/30 * * * * *") //every 5 seconds
    //@Scheduled(cron = "0 0 8 * * *") //every day 8am
    @Scheduled(cron = "${job.cron.expression}")
    public void execute() {
        log.info("Current Time      = {}", dateFormat.format(new Date()));
        reportService.processReport();
    }
}
