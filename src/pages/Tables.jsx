import { useState } from "react";
import { Users, Clock, Utensils, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import styles from "./Tables.module.css";

const statusConfig = {
  available: { label: "Available", cardClass: styles.tableCardAvailable, numberClass: styles.tableNumberAvailable, textClass: styles.textSuccess },
  occupied: { label: "Occupied", cardClass: styles.tableCardOccupied, numberClass: styles.tableNumberOccupied, textClass: styles.textPrimary },
  reserved: { label: "Reserved", cardClass: styles.tableCardReserved, numberClass: styles.tableNumberReserved, textClass: styles.textWarning },
  cleaning: { label: "Cleaning", cardClass: styles.tableCardCleaning, numberClass: styles.tableNumberCleaning, textClass: styles.textMuted },
};

const mockTables = [
  { id: "1", number: 1, seats: 2, status: "available" },
  { id: "2", number: 2, seats: 2, status: "occupied" },
  { id: "3", number: 3, seats: 4, status: "occupied" },
  { id: "4", number: 4, seats: 4, status: "available" },
  { id: "5", number: 5, seats: 4, status: "reserved" },
  { id: "6", number: 6, seats: 6, status: "cleaning" },
  { id: "7", number: 7, seats: 6, status: "available" },
  { id: "8", number: 8, seats: 8, status: "occupied" },
  { id: "9", number: 9, seats: 2, status: "available" },
  { id: "10", number: 10, seats: 4, status: "occupied" },
  { id: "11", number: 11, seats: 4, status: "available" },
  { id: "12", number: 12, seats: 6, status: "reserved" },
];

const statusFilters = ["all", "available", "occupied", "reserved", "cleaning"];

export default function Tables() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredTables = mockTables.filter((table) => {
    return selectedStatus === "all" || table.status === selectedStatus;
  });

  const stats = {
    total: mockTables.length,
    available: mockTables.filter(t => t.status === "available").length,
    occupied: mockTables.filter(t => t.status === "occupied").length,
    reserved: mockTables.filter(t => t.status === "reserved").length,
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <h1>Table Management</h1>
          <p>Monitor and manage table occupancy in real-time.</p>
        </div>
        <Button className={styles.addButton}>
          <Users className={styles.buttonIcon} />
          Add Table
        </Button>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.statCardDefault}`}>
          <p className={`${styles.statLabel} ${styles.statLabelDefault}`}>Total Tables</p>
          <p className={`${styles.statValue} ${styles.statValueDefault}`}>{stats.total}</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardSuccess}`}>
          <p className={`${styles.statLabel} ${styles.statLabelSuccess}`}>Available</p>
          <p className={`${styles.statValue} ${styles.statValueSuccess}`}>{stats.available}</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
          <p className={`${styles.statLabel} ${styles.statLabelPrimary}`}>Occupied</p>
          <p className={`${styles.statValue} ${styles.statValuePrimary}`}>{stats.occupied}</p>
        </div>
        <div className={`${styles.statCard} ${styles.statCardWarning}`}>
          <p className={`${styles.statLabel} ${styles.statLabelWarning}`}>Reserved</p>
          <p className={`${styles.statValue} ${styles.statValueWarning}`}>{stats.reserved}</p>
        </div>
      </div>

      {/* Status Filters */}
      <div className={styles.statusFilters}>
        {statusFilters.map((status) => (
          <button
            key={status}
            onClick={() => setSelectedStatus(status)}
            className={`${styles.statusButton} ${selectedStatus === status ? styles.statusButtonActive : styles.statusButtonInactive}`}
          >
            {status === "all" ? "All Tables" : statusConfig[status].label}
          </button>
        ))}
      </div>

      {/* Tables Grid */}
      <div className={styles.tablesGrid}>
        {filteredTables.map((table, index) => {
          const config = statusConfig[table.status];

          return (
            <div
              key={table.id}
              className={`${styles.tableCard} ${config.cardClass}`}
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className={styles.statusBadgeWrapper}>
                <Badge variant="outline" className={`${styles.statusBadge} ${config.textClass}`}>
                  {config.label}
                </Badge>
              </div>
              
              <div className={styles.tableContent}>
                <div className={`${styles.tableNumber} ${config.numberClass}`}>
                  <span className={styles.tableNumberText}>{table.number}</span>
                </div>
                
                <div className={styles.seatsInfo}>
                  <Users className={styles.seatsIcon} />
                  <span>{table.seats} seats</span>
                </div>

                {table.status === "occupied" && (
                  <p className={styles.orderStatus}>
                    Order in progress
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
