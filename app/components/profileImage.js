import React, { useState } from 'react';
import {upperCase} from 'lodash';
import { getInitials } from '../helpers/utils';
import { Modal, Box } from '@mui/material';

function ProfileImage({ text, image, size = 100, color = 'bg-primary', shape = 'circle', clickable = false }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const halfSize = size / 2;
  const fontSize = size / 2;

  return (
    <>
      <div
        onClick={image && clickable ? handleOpen : null}
        style={{
          width: size,
          height: size,
          borderRadius: shape === 'circle' ? '50%' : '0',
          overflow: 'hidden',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: image ? 'transparent' : color,
          cursor: image && clickable ? 'pointer' : 'default',
          margin: '0 auto'
        }}
      >
        {image ? (
          <img
            src={image}
            alt="Profile"
            style={{ width: size, height: size, borderRadius: shape === 'circle' ? '50%' : '0' }}
          />
        ) : (
          <svg width={size} height={size}>
            {shape === 'circle' ? (
              <circle cx={halfSize} cy={halfSize} r={halfSize} className={color} />
            ) : (
              <rect width={size} height={size} className={color} />
            )}
            <text
              x="50%"
              y="40%"
              alignmentBaseline="middle"
              textAnchor="middle"
              fontFamily="sans-serif"
              fontSize={fontSize}
              fill="#fff"
              dy=".3em"
            >
              {text && upperCase(getInitials(text))}
            </text>
          </svg>
        )}
      </div>
      {image && clickable && (
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'auto',
                maxWidth: '90%',
                maxHeight: '90%',
                boxShadow: 24,
                p: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
          >
            <img src={image} alt="Profile" style={{ width: '100%' }} />
          </Box>
        </Modal>
      )}
    </>
  );
}

export default ProfileImage;