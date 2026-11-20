"""Pydantic v2 schemas for experiment CRUD."""

from __future__ import annotations
from datetime import datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field, field_validator


class ExperimentCreate(BaseModel):
    """Payload to create a new experiment."""

    name: str = Field(min_length=1)
    description: str = ""
    circuit_config: dict
    num_qubits: int = Field(ge=1, le=8)
    simulation_mode: Literal["ideal", "noisy"] = "ideal"
    num_shots: int = Field(default=1024, ge=1, le=10000)
    results: dict | None = None
    notes: str = ""

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Experiment name is required.")
        return value.strip()


class ExperimentUpdate(BaseModel):
    """Partial-update payload for an experiment."""

    name: Optional[str] = Field(default=None, min_length=1)
    description: Optional[str] = None
    notes: Optional[str] = None
    results: Optional[dict] = None

    @field_validator("name")
    @classmethod
    def name_must_not_be_blank(cls, value: Optional[str]) -> Optional[str]:
        if value is not None:
            if not value.strip():
                raise ValueError("Experiment name is required.")
            return value.strip()
        return value


class ExperimentResponse(BaseModel):
    """Single experiment returned to the frontend."""

    id: int
    name: str
    description: str
    circuit_config: dict
    num_qubits: int
    gate_count: int
    simulation_mode: str
    num_shots: int
    results: dict | None
    notes: str
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class ExperimentListResponse(BaseModel):
    """Paginated list of experiments."""

    experiments: list[ExperimentResponse]
    total: int
