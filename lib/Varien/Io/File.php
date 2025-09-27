<?php

/**
 * @copyright  For copyright and license information, read the COPYING.txt file.
 * @link       /COPYING.txt
 * @license    Open Software License (OSL 3.0)
 * @package    Varien_Io
 */

/**
 * Filesystem client
 *
 * @package    Varien_Io
 */
class Varien_Io_File extends Varien_Io_Abstract
{
    // ...
    /**
     * Used to set the _allowCreateFolders value.
     *
     * @param bool $flag
     * @access public
     * @return $this
     */
    public function setAllowCreateFolders($flag)
    {
        $this->_allowCreateFolders = $flag;
        return $this;
    }
    // ...
}