import { Component, OnInit } from "@angular/core";
import Chart from "chart.js";
import { HttpClient } from "@angular/common/http";
import { Stats } from "../../shared/models/stats";
import {formatDate} from '@angular/common';
import { environment } from 'environments/environment';

@Component({
  selector: "dashboard-cmp",
  moduleId: module.id,
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas: any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  totalRedeem:any;
  totalScanned:any;
  currentDate :any;
  qrStatUrl: string = environment.qrStatUrl;
  redeemStatUrl: string = environment.redeemStatUrl;
  totalRedeemUrl = environment.totalRedeemUrl;
  totalScannedUrl = environment.totalScannedUrl;
  totalUserUrl = environment.totalUserUrl;
  qrStats: Stats[];
  redeemStats: Stats[];
  activeUser:any = 0;
  inActiveUser:any = 0;

  constructor(public http: HttpClient) {
    //this.drawStatGraph();
    this.getDashboardStats();
  }
  
  async getDashboardStats(){
        this.currentDate = formatDate(new Date(),'yyyy-MM-dd','en');
        this.http.get(this.totalRedeemUrl+"/"+this.currentDate).subscribe((data:any) => {
            this.totalRedeem = data;
            console.log('Total Redeem'+this.totalRedeem)
          });

        this.http.get(this.totalScannedUrl+"/"+this.currentDate).subscribe((data:any) => {
          this.totalScanned = data;
          console.log('Total Scanned '+ this.totalScanned);
        });
      
      this.http.get(this.totalUserUrl).subscribe((data:any[]) => {
        this.activeUser = data[0].count;
        this.inActiveUser = data[1].count;
    });
  }

  ngOnInit() {
    this.chartColor = "#FFFFFF";

      //stat grph
      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");
      var speedCanvas = document.getElementById("speedChart");

      var dataFirst;
      this.http.get(this.qrStatUrl).subscribe((statData: Stats[]) => {
        this.qrStats = statData;
        console.log("Qr stats "+this.qrStats.length);
        var stat = [];
        
        for (var qrStat of this.qrStats) {
          stat.push(qrStat.value);
        
        }
        console.log("FIRST DATA "+stat);
        dataFirst = {
          data: stat,
          fill: false,
          borderColor: "#fbc658",
          backgroundColor: "transparent",
          pointBorderColor: "#fbc658",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8
        };



        // get second data 

      var dataSecond;
      this.http.get(this.redeemStatUrl).subscribe((statRedeemData: Stats[]) => {
        this.redeemStats = statRedeemData;
        console.log("SECOND FROM API"+ this.redeemStats)
        var redeemStat = [];
        for (var qrRedeemStat of this.redeemStats) {
          redeemStat.push(qrRedeemStat.value);
        }
        console.log("SECOND DATA"+redeemStat);
        dataSecond = {
          data: redeemStat,
          fill: false,
          borderColor: "#51CACF",
          backgroundColor: "transparent",
          pointBorderColor: "#51CACF",
          pointRadius: 4,
          pointHoverRadius: 4,
          pointBorderWidth: 8
        };
//end getting second data

          //draw the graph
          console.log("DATA SECOND "+ dataSecond);
          var speedData = {
            labels: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec"
            ],
            datasets: [dataFirst, dataSecond]
          };
      
          var chartOptions = {
            legend: {
              display: false,
              position: "top"
            }
          };
      
          var lineChart = new Chart(speedCanvas, {
            type: "line",
            hover: false,
            data: speedData,
            options: chartOptions
          });


      });

      
      });
  
      
     



      //end stat graph





    

    this.chartHours = new Chart(this.ctx, {
      type: "line",

      data: {
        labels: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct"
        ],
        datasets: [
          {
            borderColor: "#6bd098",
            backgroundColor: "#6bd098",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [300, 310, 316, 322, 330, 326, 333, 345, 338, 354]
          },
          {
            borderColor: "#f17e5d",
            backgroundColor: "#f17e5d",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [320, 340, 365, 360, 370, 385, 390, 384, 408, 420]
          },
          {
            borderColor: "#fcc468",
            backgroundColor: "#fcc468",
            pointRadius: 0,
            pointHoverRadius: 0,
            borderWidth: 3,
            data: [370, 394, 415, 409, 425, 445, 460, 450, 478, 484]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 5
                //padding: 20
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent",
                display: false
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }
          ]
        }
      }
    });

    this.canvas = document.getElementById("chartEmail");
    this.ctx = this.canvas.getContext("2d");
    this.chartEmail = new Chart(this.ctx, {
      type: "pie",
      data: {
        labels: [1, 2, 3],
        datasets: [
          {
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ["#e3e3e3", "#4acccd", "#fcc468", "#ef8157"],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }
        ]
      },

      options: {
        legend: {
          display: false
        },

        pieceLabel: {
          render: "percentage",
          fontColor: ["white"],
          precision: 2
        },

        tooltips: {
          enabled: false
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: "rgba(255,255,255,0.05)"
              }
            }
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: "rgba(255,255,255,0.1)",
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false
              }
            }
          ]
        }
      }
    });

    
  }

  drawStatGraph(){
    
  }
}
