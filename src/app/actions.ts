"use server";

import { prisma } from "../lib/prisma";

export async function fetchShipmentData(trackingId: string) {
  try {
    const shipment = await prisma.shipment.findUnique({
      where: {
        trackingId: trackingId,
      },
      include: {
        updates: {
          orderBy: {
            timestamp: 'desc',
          },
        },
      },
    });

    if (!shipment) {
      return { success: false, error: "Shipment not found." };
    }

    return { success: true, data: shipment };

  } catch (error) {
    console.error("Database error tracking shipment:", error);
    return { success: false, error: "Failed to connect to tracking database." };
  }
}

export async function createShipment(data: {
  senderName: string;
  recipientName: string;
  currentLocation: string;
  weight: string;
}) {
  try {
    const trackingId = `SLX${Math.floor(10000000 + Math.random() * 90000000)}`;

    const shipment = await prisma.shipment.create({
      data: {
        trackingId,
        senderName: data.senderName,
        recipientName: data.recipientName,
        currentLocation: data.currentLocation,
        weight: data.weight,
        status: "Pending",
      },
    });

    return { success: true, trackingId: shipment.trackingId };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Database error creating shipment:", message);
    return { success: false, error: `DB Error: ${message}` };
  }
}

export async function getAllShipments() {
  try {
    const shipments = await prisma.shipment.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        updates: {
          orderBy: { timestamp: 'desc' },
        }
      }
    });
    return { success: true, data: shipments };
  } catch (error) {
    console.error("Error fetching all shipments:", error);
    return { success: false, error: "Failed to fetch shipments." };
  }
}

export async function addTrackingUpdate(data: {
  shipmentId: string;
  location: string;
  status: string;
  description: string;
}) {
  try {
    const update = await prisma.trackingUpdate.create({
      data: {
        shipmentId: data.shipmentId,
        location: data.location,
        status: data.status,
        description: data.description,
      }
    });

    await prisma.shipment.update({
      where: { id: data.shipmentId },
      data: {
        status: data.status,
        currentLocation: data.location,
      }
    });

    return { success: true, data: update };
  } catch (error) {
    console.error("Error adding tracking update:", error);
    return { success: false, error: "Failed to add tracking update." };
  }
}

export async function deleteShipment(id: string) {
  try {
    await prisma.shipment.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting shipment:", error);
    return { success: false, error: "Failed to delete shipment." };
  }
}

export async function updateShipment(id: string, data: {
  senderName?: string;
  recipientName?: string;
  currentLocation?: string;
  weight?: string;
  status?: string;
}) {
  try {
    const shipment = await prisma.shipment.update({
      where: { id },
      data
    });
    return { success: true, data: shipment };
  } catch (error) {
    console.error("Error updating shipment:", error);
    return { success: false, error: "Failed to update shipment." };
  }
}

export async function updateTrackingUpdate(id: string, data: {
  location?: string;
  status?: string;
  description?: string;
}) {
  try {
    const update = await prisma.trackingUpdate.update({
      where: { id },
      data
    });
    return { success: true, data: update };
  } catch (error) {
    console.error("Error updating tracking update:", error);
    return { success: false, error: "Failed to update checkpoint." };
  }
}

export async function deleteTrackingUpdate(id: string) {
  try {
    await prisma.trackingUpdate.delete({
      where: { id }
    });
    return { success: true };
  } catch (error) {
    console.error("Error deleting tracking update:", error);
    return { success: false, error: "Failed to delete checkpoint." };
  }
}
