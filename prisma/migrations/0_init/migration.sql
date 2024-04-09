-- CreateTable
CREATE TABLE "Taxis" (
    "id" INTEGER NOT NULL,
    "plate" TEXT,

    CONSTRAINT "taxis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trajectories" (
    "id" SERIAL NOT NULL,
    "taxi_id" INTEGER,
    "date" TIMESTAMP(6),
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,

    CONSTRAINT "trajectories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trajectories" ADD CONSTRAINT "fk_taxis" FOREIGN KEY ("taxi_id") REFERENCES "Taxis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

