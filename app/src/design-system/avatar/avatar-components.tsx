import {
  Avatar,
  AvatarGroup, AvatarGroupProps, AvatarProps, ClickAwayListener, ListItem, ListItemAvatar, ListItemText, Menu,
  MenuList,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
} from '@mui/material';
import { getAvatarName, getContrastColor } from '~/util';
import { useMemo, useState } from 'react';
import { Child, IPerson } from '../types';
import _ from 'lodash';

const DEFAULT_SIZE = 20;
const DEFAULT_FONTSIZE = 11;
export interface IAvatarProps extends Omit<AvatarProps, 'size'> {
  size?: number;
  fontSize?: number;
}

export interface IIndividualAvatarProps extends IAvatarProps {
  subject?: {
    id?: string;
    uid?: string
    name: string;
    color: string;
  };
  tooltip?: string;
  tooltipPlacement?: TooltipProps["placement"]
}

function Individual({
  subject,
  size = DEFAULT_SIZE,
  fontSize = DEFAULT_FONTSIZE,
  tooltip,
  tooltipPlacement = "top",
  ...rest
}: IIndividualAvatarProps) {
  const initials = useMemo(
    () => (subject ? subject.name === 'Ingen' ? '?' : getAvatarName(subject.name) : undefined),
    [subject],
  );

  if (!subject) return <Unknown />;

  return (
        <Tooltip placement={tooltipPlacement} title={tooltip || subject.name}>
            <Avatar
                sx={{
                  backgroundColor: subject.color,
                  width: size,
                  height: size,
                  ...rest["sx"]
                }}
                {..._.omit(rest, ["sx"])}
            >
                <Typography
                    fontSize={fontSize}
                    fontWeight="bold"
                    sx={{ color: getContrastColor(subject.color) }}
                >
                    {initials}
                </Typography>
            </Avatar>
        </Tooltip>
  );
}

function Unknown({
  size = DEFAULT_SIZE,
  fontSize = DEFAULT_FONTSIZE,
  ...rest
}: IAvatarProps) {
  return (
        <Avatar
            sx={{
              height: size,
              width: size,
            }}
            {...rest}
        >
            <Typography
                fontSize={fontSize}
                fontWeight={600}
                sx={{ color: '#000' }}
            >
                ?
            </Typography>
        </Avatar>
  );
}

function SurplusAvatar({
  size = DEFAULT_SIZE,
  fontSize = DEFAULT_FONTSIZE,
  value,
  ...rest
}: IAvatarProps & { value: number }) {
  return (
        <Avatar
            sx={{
              height: size,
              width: size,
            }}
            {...rest}
        >
            <Typography
                fontSize={fontSize}
                fontWeight={600}
                sx={{ color: '#000' }}
            >
                {`+${value}`}
            </Typography>
        </Avatar>
  );
}

function EllipsisGroup({
  People,
  max = 5,
  children: Avatars,
  groupProps = {sx: {}},
  ...rest
}: IAvatarProps & { People?: IPerson[]; max?: number; children?: Child[], groupProps?: Omit<AvatarGroupProps, "max">}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpen = (event: HTMLElement) => {
    setAnchorEl((prev) => (prev ? null : event));
  };

  function clampAvatars(
    avatars: Array<any>,
    options: { max?: number; total?: number } = { max: 5 },
  ) {
    const { max = 5, total } = options;
    let clampedMax = max < 2 ? 2 : max;
    const totalAvatars = total || avatars.length;
    if (totalAvatars === clampedMax) {
      clampedMax += 1;
    }
    clampedMax = Math.min(totalAvatars + 1, clampedMax);
    const maxAvatars = Math.min(avatars.length, clampedMax - 1);
    const surplus = Math.max(
      totalAvatars - clampedMax,
      totalAvatars - maxAvatars,
      0,
    );
    const visibleCount = Math.min(maxAvatars, totalAvatars-surplus)
    return { avatars: avatars.slice(0, maxAvatars).reverse(), surplus, visibleCount };
  }

  const { avatars, surplus, visibleCount } = clampAvatars(People ?? Avatars ?? [], {
    max,
    total: People?.length ?? Avatars?.length ?? 0,
  });

  return (
        <>
            <Stack direction="row" alignItems="center"  onClick={(event) => (handleOpen ? handleOpen(event.currentTarget) : null)}>
            <AvatarGroup
                sx={{
                  cursor: 'pointer',
                  ...groupProps["sx"]
                }}
                //onClick={(event) => (handleOpen ? handleOpen(event.currentTarget) : null)}
                max={20}
                {...groupProps}
            >
                {Avatars ? _.take(Avatars, visibleCount) : avatars.map((avatar) => (
                    <Individual subject={avatar} {...rest} key={avatar.id} />
                ))}
                {!!surplus && <SurplusAvatar value={surplus} {...rest} />}
                {People && <EllipsisMenu
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    People={People}
                    {...rest}
                />}
                 </AvatarGroup>
           </Stack>
        </>
  );
}
/*            */

interface IEllipsisMenuProps extends IAvatarProps {
  People: IPerson[];
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
}

function EllipsisMenu({
  People,
  open,
  anchorEl,
  onClose,
  ...rest
}: IEllipsisMenuProps) {
  return (
        <Menu open={open} anchorEl={anchorEl} onClose={onClose} sx={{ py: 0 }}>
            <ClickAwayListener onClickAway={onClose}>
                <MenuList>
                    {People.map((Person) => (
                        <ListItem key={Person.id}>
                            <ListItemAvatar>
                                <Individual subject={Person} {...rest} />
                            </ListItemAvatar>
                            <ListItemText primary={Person.name} />
                        </ListItem>
                    ))}
                </MenuList>
            </ClickAwayListener>
        </Menu>
  );
}

export const Avatars = {
  Unknown,
  Individual,
  EllipsisGroup,
  SurplusAvatar,
};
