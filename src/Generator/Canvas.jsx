import React, { useState, useRef, useEffect, useCallback } from "react";
import { Grid, IconButton, Stack, Tooltip } from "@mui/material";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import debounce from "lodash.debounce";

const CanvasComponent = ({ file }) => {
  const canvasRef = useRef(null);
  const [scale, setScale] = useState(0.5);
  const [drawPos, setDrawPos] = useState([0, 0]);
  const [mouseDown, setMouseDown] = useState(false);
  const [mousePos, setMousePos] = useState([0, 0]);
  const imageRef = useRef(new Image());
  const touchStartDistance = useRef(0);

  const DEFAULT_ZOOM = 0.5;
  const MAX_ZOOM = 3;
  const MIN_ZOOM = 0.2;
  const ZOOM_STEP = 0.03;

  const zoomIn = useCallback(() => {
    if (scale < MAX_ZOOM) {
      setScale((prevScale) => prevScale + ZOOM_STEP);
    }
  }, [scale]);

  const zoomOut = useCallback(() => {
    if (scale > MIN_ZOOM) {
      setScale((prevScale) => prevScale - ZOOM_STEP);
    }
  }, [scale]);

  const resetZoom = useCallback(() => {
    setScale(DEFAULT_ZOOM);
  }, []);

  const reset = useCallback(() => {
    const canvas = canvasRef.current;
    setDrawPos([canvas.width / 2, canvas.height / 2]);
    resetZoom();
  }, [resetZoom]);

  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setMouseDown(true);
      setMousePos([e.touches[0].clientX, e.touches[0].clientY]);
    } else if (e.touches.length === 2) {
      touchStartDistance.current = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  };

  const handleTouchMove = debounce((e) => {
    if (e.touches.length === 1 && mouseDown) {
      const delta = [
        (e.touches[0].clientX - mousePos[0]) * 0.5,
        (e.touches[0].clientY - mousePos[1]) * 0.5,
      ];
      requestAnimationFrame(() => {
        setDrawPos((prevPos) => [prevPos[0] + delta[0], prevPos[1] + delta[1]]);
        setMousePos([e.touches[0].clientX, e.touches[0].clientY]);
      });
    } else if (e.touches.length === 2) {
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleChange =
        (currentDistance - touchStartDistance.current) * 0.001;
      setScale((prevScale) =>
        Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prevScale + scaleChange))
      );
      touchStartDistance.current = currentDistance;
    }
  }, 4);

  const handleTouchEnd = () => {
    setMouseDown(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    const image = imageRef.current;

    const drawCanvas = () => {
      context.fillStyle = "#FFFFFF";
      context.fillRect(0, 0, canvas.width, canvas.height);
      if (image.complete) {
        drawImage();
      }
    };

    const drawImage = () => {
      const w = image.width * scale;
      const h = image.height * scale;
      const x = drawPos[0] - w / 2;
      const y = drawPos[1] - h / 2;
      context.drawImage(image, x, y, w, h);
    };

    const zoom = (e) => {
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    };

    const setMouseDownHandler = (e) => {
      setMouseDown(true);
      setMousePos([e.clientX, e.clientY]);
    };

    const setMouseUpHandler = () => {
      setMouseDown(false);
    };

    const move = debounce((e) => {
      if (mouseDown) {
        const delta = [
          (e.clientX - mousePos[0]) * 0.5,
          (e.clientY - mousePos[1]) * 0.5,
        ];
        requestAnimationFrame(() => {
          setDrawPos((prevPos) => [
            prevPos[0] + delta[0],
            prevPos[1] + delta[1],
          ]);
          setMousePos([e.clientX, e.clientY]);
        });
      }
    }, 4);

    image.src = URL.createObjectURL(file);
    image.onload = drawCanvas;

    canvas.addEventListener("wheel", zoom);
    canvas.addEventListener("mousedown", setMouseDownHandler);
    canvas.addEventListener("mouseup", setMouseUpHandler);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("wheel", zoom);
      canvas.removeEventListener("mousedown", setMouseDownHandler);
      canvas.removeEventListener("mouseup", setMouseUpHandler);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [
    file,
    scale,
    drawPos,
    mouseDown,
    mousePos,
    zoomIn,
    zoomOut,
    handleTouchMove,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    setDrawPos([canvas.width / 2, canvas.height / 2]);
  }, []);

  return (
    <Grid container justifyContent="space-evenly" alignItems="center">
      <Grid item md={1} xs={12} my={1} className="controls">
        <Stack
          spacing={4}
          direction={{ xs: "row", md: "column" }}
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title="Resetuj" placement="top">
            <IconButton
              aria-label="Resetuj"
              size="large"
              color="primary"
              onClick={reset}
            >
              <CenterFocusWeakIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Powiększ" placement="top">
            <IconButton
              aria-label="Powiększ"
              size="large"
              color="primary"
              onClick={zoomIn}
            >
              <ZoomInIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Pomniejsz" placement="top">
            <IconButton
              aria-label="Pomniejsz"
              size="large"
              color="primary"
              onClick={zoomOut}
            >
              <ZoomOutIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Grid>
      <Grid
        item
        elevation={24}
        md={11}
        xs={12}
        my={2}
        sx={{
          height: "65vh",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            border: "1px solid #000",
            cursor: mouseDown ? "move" : "crosshair",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default CanvasComponent;
